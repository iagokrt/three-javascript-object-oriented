# this is how a shader material look like on programmatically side

 ```js
    this.material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: '#extension GL_OES_standard_derivatives :enable',
        },
        uniforms: {
          time: { type: 'f', value: 0 },
          progress: { type: 'f', value: 0 },
          uDistortion: { type: 'f', value: 0 },
          t: {
            type: 't',
            value: new THREE.TextureLoader().load(t),
          },
          t1: {
            type: 't',
            value: new THREE.TextureLoader().load(t1),
          },
          resolution: { type: 'v4', value: new THREE.Vector4() },
          uvRate1: {
            value: new THREE.Vector2(1, 1),
          },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
  });
 ```

# also have to call on render functions the shaders uniforms variations, like clock or fragment/vertex shaders settings

```js
  this.material.uniforms.time.value = this.time;
  this.material.uniforms.uDistortion.value = this.settings.distortion;
```