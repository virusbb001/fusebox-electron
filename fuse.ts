import { fusebox, sparky } from 'fuse-box'

class Context {
  getMainConfig () {
    return fusebox ({
      dependencies: {
        serverIgnoreExternals: true
      },
      entry: './src/main/main.ts',
      modules: [ 'node_modules'],
      target: 'server'
    })
  }
  getRendererConfig () {
    return fusebox({
      devServer: {
        hmrServer: {
          port: 7878
        },
        httpServer: false
      },
      electron: {
        nodeIntegration: false
      },
      entry: 'src/renderer/index.ts',
      modules: ['node_modules'],
      target: 'electron',
      webIndex: {
        publicPath: './',
        template: 'src/renderer/index.html'
      }
    })
  }
  getPreloadConfig () {
    return fusebox({
      dependencies: {
        serverIgnoreExternals: true
      },
      electron: {
        nodeIntegration: false
      },
      entry: 'src/renderer/preload.ts',
      modules: ['node_modules'],
      target: 'server'
    })
  }
}

const { rm, task } = sparky(Context);

task('default', async ctx => {
  rm('./dist');
  const rendererConfig = ctx.getRendererConfig();
  await rendererConfig.runDev({
    bundles: {
      distRoot: 'dist/renderer',
      app: 'app.js'
    }
  })

  const preloadConfig = ctx.getPreloadConfig();
  await preloadConfig.runDev({
    bundles: {
      distRoot: 'dist/renderer',
      app: 'preload.js'
    }
  })

  const electronMain = ctx.getMainConfig();
  const { onComplete } = await electronMain.runDev({
    bundles: {
      distRoot: 'dist/main',
      app: 'app.js',
      vendor: 'vendor.js'
    }
  })

  onComplete(({ electron }) => {
    electron?.start();
  })
})

task('build', async ctx => {
  rm('./dist');
  const rendererConfig = ctx.getRendererConfig();
  await rendererConfig.runProd({
    bundles: {
      distRoot: 'dist/renderer',
      app: 'app.js'
    }
  })

  const preloadConfig = ctx.getPreloadConfig();
  await preloadConfig.runProd({
    bundles: {
      distRoot: 'dist/renderer',
      app: 'preload.js'
    }
  })


  const electronMain = ctx.getMainConfig();
  await electronMain.runProd({
    bundles: {
      distRoot: 'dist/main',
      app: 'app.js',
      vendor: 'vendor.js'
    }
  })
})
