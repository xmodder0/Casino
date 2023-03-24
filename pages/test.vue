<template>
  <div
    style="max-width: 650px; width: 100%; padding-left: 8px; padding-right: 8px"
  >
    <div
      style="
        max-width: 666px;
        width: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
      "
    >
      <canvas id="pixi" style="touch-action: none; cursor: inherit"></canvas>
    </div>
  </div>
</template>

<style>
.box {
  width: 50px;
  height: 50px;
  background-color: red;
  position: absolute;
  bottom: 0;
  left: 0;
}

#pixi {
  width: 100%;
  height: 265px; /* initial height */
}
@media screen and (min-width: 480px) {
  #pixi {
    height: 300px; /* larger height for screens >= 1080px */
  }
}
@media screen and (min-width: 720px) {
  #pixi {
    height: 400px; /* larger height for screens >= 1080px */
  }
}
</style>

<script>
export default {
  methods: {
    drawPixi() {
      // CRASH APPLICATION CONTAINER
      const canvas = document.getElementById('pixi')
      const app = new this.$pixi.Application({
        backgroundColor: '0x00ccff',
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        autoResize: true,
        view: canvas,
      })

      // BACKGROUND IMAGE
      const groundTexture = this.$pixi.Texture.from(
        'img/crashAssets/ground.png'
      )
      const backgroundImg = this.$pixi.Sprite.from(groundTexture)
      backgroundImg.width = canvas.offsetWidth
      backgroundImg.height = canvas.offsetHeight - 100
      backgroundImg.y = 105
      app.stage.addChild(backgroundImg)

      // ROCKET TAIL TEXTURE
      const rocketTailTexture = this.$pixi.Texture.from(
        'img/crashAssets/tail.png'
      )
      const rocketTail = this.$pixi.Sprite.from(rocketTailTexture)
      rocketTail.anchor.set(0.9)
      rocketTail.x = 100
      rocketTail.y = 255
      rocketTail.width = 200
      rocketTail.height = 12
      rocketTail.resolution = 1
      app.stage.addChild(rocketTail)

      this.$gsap.to(rocketTail, {
        bezier: {
          values: [
            { x: 160, y: 260 },
            { x: 160, y: 100 },
            { x: 160, y: 260 },
            { x: 315, y: 70 },
          ],
          type: 'soft',
          curviness: 2,
        },
        delay: 1,
        rotation: -1.4,
        ease: this.$power2.easeInOut,
      })

      // ROCKET TEXTURE
      const rocketTexture = this.$pixi.Texture.from(
        'img/crashAssets/racoon.png'
      )
      const rocket = this.$pixi.Sprite.from(rocketTexture)
      rocket.anchor.set(0.5)
      rocket.x = 15
      rocket.y = 250
      rocket.width = 75
      rocket.height = 75
      rocket.resolution = 1
      app.stage.addChild(rocket)

      this.$gsap.to(rocket, 1.8, {
        bezier: {
          values: [
            { x: 160, y: 260 },
            { x: 310, y: 60 },
          ],
          type: 'soft',
          curviness: 2,
        },
        delay: 1,
        rotation: -1.6,
        ease: this.$power2.easeInOut,
      })

      // TICKER
      app.ticker.add(() => {
        backgroundImg.position.y += 0.4
      })
    },
  },
  mounted() {
    this.drawPixi()
  },
}
</script>
