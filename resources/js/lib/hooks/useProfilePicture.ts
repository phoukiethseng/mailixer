import { useEffect, useState } from 'react'
import axios from 'axios'

export function useProfilePicture(signedUrl: string | null) {
  const [profilePictureBase64, setProfilePictureBase64] = useState<
    string | null
  >(null)

  useEffect(() => {
    if (signedUrl && signedUrl !== '') {
      axios.get(signedUrl).then((res) => {
        setProfilePictureBase64(res.data['base64Data'])
      })
    }
  }, [signedUrl])
  return profilePictureBase64
}
