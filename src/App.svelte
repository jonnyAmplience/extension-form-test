<script>
  import { onMount } from 'svelte';
  import {sdk} from './main';
  import { ExtensionBridge } from "dc-extensions-sdk-bridge";

  let iframe;

  // {
  //   caption:   {
  //   "title": "Hero Alt Text",
  //   "type": "string",
  //   "minLength": 0,
  //   "maxLength": 200,
  //   "ui:extension": {
  //     url: 'https://ai-image-caption.extensions.content.amplience.net',
  //     "params": {
  //       "image": "/image"
  //     }
  //   }
  // }
  // }


  onMount(async () => {
    const bridge = new ExtensionBridge('$.caption', {
    parentConnection: $sdk.client.connection,

    field: ''
  })
  await bridge.init(iframe);

  iframe.src = 'https://ai-image-caption.extensions.content.amplience.net';
  })

  const getMedia = async () => {
    console.log($sdk)
    const img = await $sdk.connection.request('media-image-get')
    console.log(img);
  }
</script>

<main>
  <iframe bind:this={iframe}></iframe>
  <button on:click={getMedia}>Get media</button>
</main>

