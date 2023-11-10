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


  const testRateLimit = async () => {
    const img = await $sdk.connection.request('media-image-get')
    for (let i = 0; i <= 20; i++) {
      console.log('requesting now...', i + 1)
      $sdk.connection.request('get-asset-by-id', img.id).then(console.log).catch(console.log)
    }
  }
</script>

<main>
  <iframe bind:this={iframe}></iframe>
  <button on:click={getMedia}>Get media</button>
  <button on:click={testRateLimit}>test rate limiting</button>
</main>

