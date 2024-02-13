<div style="padding-top: 1.5rem; display: flex; min-height: 50vh; width: 100vw; flex-direction: column; align-items: center; justify-content: start; background-color: #f4f4f5;">
    <div style="height: 100%; width: 73%; border-radius: 0.25rem; background-color: #ffffff; padding-left: 1rem; padding-right: 1rem; padding-top: 1.25rem; padding-bottom: 1.25rem;">

        @if($contentType == 'html' || $contentType == 'markdown')
            {!! $content !!}
        @else
            <p>{!! nl2br($content) !!}</p>
        @endif

        <span style="margin-top: 0.75rem; margin-bottom: 0.75rem; display: block; height: 1px; width: 100%; border-radius: 0.75rem; background-color: #718096;"> </span>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; font-size: 0.75rem; padding-top: 0.5rem; padding-bottom: 0.5rem;">
            <div style="margin: 0; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; border-radius: 0.5rem; background-color: #f4f4f5; padding-left: 1rem; padding-right: 1rem; padding-top: 0.75rem; padding-bottom: 0.75rem;">
                <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Didn't want to receive any more newsletter?</p>
                <a href="{{ $unsubscribe_url }}" style="margin: 0; font-weight: bold; color: #00B88F; text-decoration: underline; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Unsubscribe</a>
            </div>
            <p style="margin: 0; background-image: linear-gradient(to right, #00B88F, #0092D2); -webkit-background-clip: text; background-clip: text; text-align: center; font-size: 2rem; font-weight: 800; color: transparent; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">Mailixer</p>
        </div>
    </div>
</div>


