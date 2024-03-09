<div
    style="background-color: #f3f2f0; width: 100%; min-height: 350px; padding-top: 2rem; padding-bottom: 2rem; font-family: sans-serif;">
    <table role="presentation" width="500" valign="top" align="center" border="0" cellspacing="0" cellpadding="0"
           style="width: 93%; max-width: 760px; background-color: #ffffff; border-radius: 0.65rem; padding-left: 1rem; padding-right: 1rem; padding-top: 1.25rem; padding-bottom: 1.25rem;">
        <tbody>
        <tr>
            <td align="center" style="font-size: 1.75rem; font-weight: 800; color: #2B2B2B"> {{ $subject }} </td>
        </tr>
        <tr>
            <td style="padding-top: 1rem;">
                <span
                    style="display: block; height: 2px; width: 100%; border-radius: 2rem; background-color: #f3f2f0;"> </span>
            </td>
        </tr>
        <tr>
            <td style="padding: 1.75rem 0.75rem;">
                @if($contentType == 'html' || $contentType == 'markdown')
                    {!! $content !!}
                @else
                    <p>{!! nl2br($content) !!}</p>
                @endif
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 1rem;">
                <span
                    style="display: block; height: 0.25rem; width: 75%; border-radius: 2rem; background-color: #B5F7CD;"> </span>
            </td>
        </tr>

        <tr>
            <td style="padding-top: 0.75rem;">
                <table role="presentation" valign="top" align="center" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td>
                            <p style="margin: 0; background-image: linear-gradient(to right, #00B88F, #0092D2); -webkit-background-clip: text; background-clip: text; text-align: center; font-size: 2rem; font-weight: 800; color: transparent; font-family: Arial, sans-serif;">
                                Mailixer</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="middle" style="padding: 0.4rem;">
                            <table role="presentation" valign="top" align="center" border="0" cellspacing="0"
                                   cellpadding="0" style="line-height: 2rem;">
                                <tbody>
                                <tr>
                                    <td align="center"
                                        style="padding: 0; margin: 0; font-weight: 100; color: #666666; font-size: 0.85rem;">
                                        Didn't want to receive any more newsletter?
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center"
                                        style="padding: 0; margin: 0; font-size: 0.8rem; font-weight: 600;">
                                        <a target="_blank" href="{{ $unsubscribe_url }}"
                                           style="border-radius: 0.5rem; color: #DE3737; background-color: #FAF0F0; padding: 0.5rem 1rem;">Unsubscribe</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>
