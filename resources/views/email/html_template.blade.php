@if($contentType == 'html' || $contentType == 'markdown')
    {!! $content !!}
@else
    <p>{!! nl2br($content) !!}</p>
@endif
<div style="width: 100%; align-text: center; padding: 5px;">
    <p>Didn't want to recieve any more newsletter? </p>
    <a :href="$subscribe_url">Unsubscribe</a>
</div>