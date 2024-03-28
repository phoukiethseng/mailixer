import React, { ChangeEvent, useEffect, useId, useState } from 'react'
import LogoText from '@/Components/LogoText'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/Form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/Components/Carousel'
import { Input } from '@/Components/Input'
import { Button } from '@/Components/Button'
import { Avatar, AvatarImage } from '@/Components/Avatar'
import { BASE64, MIME_TYPE } from '@/types/DTO'
import { Dialog, DialogContent, DialogTrigger } from '@/Components/Dialog'
import { UploadImage } from '@/Components/UploadImage'
import imageCompression from 'browser-image-compression'
import { blobToBase64 } from 'base64-blob'
import axios, { AxiosError } from 'axios'
import useLoader from '@/lib/hooks/useLoader'
import { router } from '@inertiajs/react'
import IconInput from '@/Components/IconInput'
import { Icons } from '@/Components/Icons'
import { InertiaSharedProps } from '@/types/inertia'
import { useRoute } from 'ziggy-js'

// https://www.abstractapi.com/guides/email-address-pattern-validation
const emailNameRegex =
  /^(?<local_part>[-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$/ // RFC 5322, RFC 5321
const emailLocalPartRegex =
  /^([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")$/

const imageFileExtensionrRegex = /^.+\.(?<file_extension>[a-zA-Z]+)$/

const emailFormZod = z.object({
  email: z.string().email(),
})

type UserRegistrationData = {
  email: string
  name: string
  password: string
  profilePicture?: BASE64
  profilePictureType?: MIME_TYPE
}

const defaultUserRegistrationData = { email: '', password: '', name: '' }

const passwordFormZod = z.object({
  email: z
    .string()
    .email()
    .optional()
    .nullable()
    .transform((val) => undefined),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
})

const profileFormZod = z.object({
  profilePicture: z.string().nullable(),
  name: z.string().nonempty('Display Name cannot be empty'),
})

type RegisterPageProps = {} & InertiaSharedProps

export default function RegisterPage(props: RegisterPageProps) {
  // Store all registration data for final submission
  // Each submission of form will set value to this state
  const [userRegistrationData, setUserRegistrationData] =
    useState<UserRegistrationData>(defaultUserRegistrationData)
  const [finalSubmit, setFinalSubmit] = useState<boolean>(false)
  const [profilePictureType, setProfilePictureType] =
    useState<string>('image/png')
  const { isLoading, load } = useLoader()

  const route = useRoute()

  const emailForm = useForm<z.infer<typeof emailFormZod>>({
    resolver: zodResolver(emailFormZod),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    if (userRegistrationData.email !== '') {
      const name =
        emailNameRegex.exec(userRegistrationData.email)?.groups?.[
          'local_part'
        ] ?? ''

      // Also check if user has not changed displayName to other value,
      // We set value of `name` form field only once (Email form submission)
      const currentFormFieldValue = profileForm.getValues('name')
      if (currentFormFieldValue === '' && currentFormFieldValue !== name) {
        profileForm.setValue('name', name)
      }
    }
  }, [userRegistrationData])

  useEffect(() => {
    if (finalSubmit) {
      // alert(`final submission data: ${JSON.stringify(userRegistrationData)}`)

      router.post(route('register.page'), {
        ...userRegistrationData,
      })

      setFinalSubmit(false)
    }
  }, [finalSubmit])

  const passwordForm = useForm<z.infer<typeof passwordFormZod>>({
    resolver: zodResolver(passwordFormZod),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const profileForm = useForm<z.infer<typeof profileFormZod>>({
    resolver: zodResolver(profileFormZod),
    defaultValues: {
      profilePicture: null,
      name: '',
    },
  })

  const emailFormId = useId()
  const passwordFormId = useId()
  const profileFormId = useId()

  // Carousel api state
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  const [isUploadImageDialogOpen, setIsUploadImageDialogOpen] =
    useState<boolean>(false)

  function handleEmailFormSubmission(data: z.infer<typeof emailFormZod>) {
    load(async () => {
      try {
        // Do XHR Request instead of Inertia request since this is not final form submission
        // and inertia form submission will re-fetch page props and reset react states
        const response = await axios.post('/checkEmail', {
          email: data.email,
        })

        if (response.status === 200 && response.data['status'] === 'ok') {
          setUserRegistrationData((previousValue) => ({
            ...previousValue,
            email: data.email,
          }))
          carouselApi?.scrollNext()
        }
      } catch (error: any | AxiosError) {
        if (
          error instanceof AxiosError &&
          error?.response?.status === 403 &&
          error?.response.data['status'] === 'failed'
        ) {
          emailForm.setError('email', {
            type: 'manual',
            message: error.response.data['message'],
          })
        } else {
          emailForm.setError('email', {
            type: 'manual',
            message: 'An error occurred. Please try again later.',
          })
        }
      }
    })
  }

  function handlePasswordFormSubmission(data: z.infer<typeof passwordFormZod>) {
    // We do not need to do server-side validation
    // unlike email validation which need to check for existing email,
    // we can validate password rule in frontend

    // First make sure `password` and `confirmPassword` actually have the same length and same content
    if (data.password.length !== data.confirmPassword.length) {
      passwordForm.setError('confirmPassword', {
        type: 'manual',
        message: 'Confirm Password should have the same length as Password',
      })
      return
    }
    if (data.confirmPassword !== data.password) {
      passwordForm.setError('confirmPassword', {
        type: 'manual',
        message: 'Confirm Password should be the same as Password',
      })
      return
    }

    setUserRegistrationData((previousValue) => ({
      ...previousValue,
      password: data.password,
    }))
    carouselApi?.scrollNext()
  }

  function handleProfileFormSubmission(data: z.infer<typeof profileFormZod>) {
    // Validate `displayName` to conform to RFC5322 and RFC5321 specification
    if (!emailLocalPartRegex.test(data.name)) {
      profileForm.setError('name', {
        type: 'manual',
        message: 'Display name is not a valid email local part',
      })
      return
    }

    setUserRegistrationData(
      (previousValue) =>
        ({
          ...previousValue,
          profilePicture: data.profilePicture,
          profilePictureType: profilePictureType,
          name: data.name,
        }) as UserRegistrationData
    )

    // Trigger submission code
    setFinalSubmit(true)
  }

  async function handleProfilePictureFileSelection(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const imageFile = e.target.files?.[0]
    const imageFileExtensionName = imageFileExtensionrRegex.exec(
      imageFile?.name ?? ''
    )?.groups?.['file_extension']
    if (imageFile) {
      const compressedImage = await imageCompression(imageFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      })
      const base64Image = await blobToBase64(compressedImage)
      profileForm.setValue('profilePicture', base64Image)
      setProfilePictureType(`image/${imageFileExtensionName ?? 'png'}`)
    }
    setIsUploadImageDialogOpen(false)
  }

  return (
    <div
      className={
        'w-full h-screen flex flex-col justify-center items-center gap-6'
      }
    >
      <LogoText />
      <Carousel
        setApi={setCarouselApi}
        opts={{ align: 'start', watchDrag: false }}
        className={
          'w-[80%] sm:w-[55%] md:w-[45%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%]'
        }
      >
        <CarouselContent className={'px-2'}>
          <CarouselItem>
            <Form {...emailForm}>
              <form
                id={emailFormId}
                className={'flex flex-col gap-5 items-stretch'}
                onSubmit={emailForm.handleSubmit(handleEmailFormSubmission)}
              >
                <FormField
                  name={'email'}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <IconInput icon={Icons.Mail} {...field} />
                        <FormDescription>
                          Enter your email address
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type={'submit'}
                  form={emailFormId}
                >
                  Next
                </Button>
              </form>
            </Form>
          </CarouselItem>
          <CarouselItem className={'items-stretch'}>
            <Form {...passwordForm}>
              <form
                id={passwordFormId}
                className={'flex flex-col gap-5 items-stretch'}
                onSubmit={passwordForm.handleSubmit(
                  handlePasswordFormSubmission
                )}
              >
                {/*This is discarded field, it is only used for displaying user entered email only. It will be unregistered on form submission*/}
                <FormField
                  shouldUnregister
                  disabled
                  name={'email'}
                  render={({ field }) => {
                    useEffect(() => {
                      field.onChange(userRegistrationData.email)
                    }, [userRegistrationData])
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <IconInput
                          icon={Icons.Mail}
                          disabled
                          defaultValue={field.value}
                        />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  name={'password'}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <IconInput
                          icon={Icons.Lock}
                          type={'password'}
                          {...field}
                        />
                        <FormDescription>
                          Password should be at least 8 characters long
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  name={'confirmPassword'}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <IconInput
                          icon={Icons.Lock}
                          type={'password'}
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <div
                  className={'flex flex-row gap-3 self-stretch justify-between'}
                >
                  <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    type={'button'}
                    variant={'secondary'}
                    onClick={() => carouselApi?.scrollPrev()}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    type={'submit'}
                    form={passwordFormId}
                  >
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CarouselItem>
          <CarouselItem className={'pr-1 flex flex-col items-center'}>
            <Form {...profileForm}>
              <form
                className={'flex flex-col gap-3'}
                id={profileFormId}
                onSubmit={profileForm.handleSubmit(handleProfileFormSubmission)}
              >
                <FormField
                  name={'profilePicture'}
                  render={({ field }) => {
                    return (
                      <FormItem className={'flex flex-col items-center gap-3'}>
                        <Avatar
                          className={
                            'w-32 h-32 border-2 border-primary shadow-lg'
                          }
                        >
                          <AvatarImage
                            src={field.value ?? '/default_avatar.png'}
                            alt={'User Profile Picture'}
                          />
                        </Avatar>
                        <Dialog
                          open={isUploadImageDialogOpen}
                          onOpenChange={setIsUploadImageDialogOpen}
                        >
                          <DialogTrigger>
                            <Button
                              type={'button'}
                              variant={'outline'}
                              size={'sm'}
                            >
                              Change
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <UploadImage
                              disableFromUrl
                              onImageFileSelectionChange={
                                handleProfilePictureFileSelection
                              }
                              onImageURLSubmission={() => {}}
                            />
                          </DialogContent>
                        </Dialog>
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  name={'name'}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <Input {...field} />
                        <FormDescription>
                          <p>
                            This will be show up in your email newsletter `From`
                            header. For example: Kiethseng@mailixer.cc. Display
                            name should conform to below rule:
                          </p>
                          <ul className={'mt-3 list-decimal px-5'}>
                            <li>
                              {
                                'Uppercase and lowercase English letters (a-z, A-Z)'
                              }
                            </li>
                            <li>{'Digits (0-9)'}</li>
                            <li>
                              {
                                "Special characters: ! # $ % & ' * + - / = ? ^ _ ` { | } ~"
                              }
                            </li>
                            <li>
                              {
                                'Dot (.), but not as the first or last character and not consecutively (i.e., "..")'
                              }
                            </li>
                          </ul>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type={'submit'}
                  form={profileFormId}
                >
                  Sign Up
                </Button>
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  type={'button'}
                  variant={'ghost'}
                  onClick={() => carouselApi?.scrollPrev()}
                >
                  Back
                </Button>
              </form>
            </Form>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}
