import * as path from 'path'
import * as _ from 'lodash'
import * as models from '../../../models'
import * as lib from '../../../lib'

export function getRoutesJS(g3Config: models.G3Config, sourceDir: models.SourceDir): string {
  const dirPath = path.join(g3Config._g3Path, sourceDir.key)

  let routesJS = ''
  routesJS += 'export default {'
  if (sourceDir.routes.path) {
    routesJS += `
  path: '${sourceDir.routes.path}'`
  } else {
    routesJS += `
  component: 'div'`
  }

  if (sourceDir.routes.layout) {
    const layoutPath = path.join(sourceDir.path, sourceDir.routes.layout)
    const rel = lib.forwardSlash(path.relative(dirPath, layoutPath))
    routesJS += `,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('${rel}').default);
    });
  }`
  }

  if (sourceDir.routes.redirect) {
    let redirect = sourceDir.routes.redirect
    if (redirect[0] !== '/') {
      redirect = lib.urlJoin(getRoutePath(sourceDir), redirect)
    }
    routesJS += `,
  indexRoute: {
    onEnter: (nextState, replace) => replace('${redirect}')
  }`
  } else {
    let rel = ''
    if (!sourceDir.routes.index) {
      if (sourceDir.filenames.indexOf(models.Const.FILE_INDEX + '.jsx') !== -1) {
        const indexPath = path.join(sourceDir.path, 'index')
        rel = lib.forwardSlash(path.relative(dirPath, indexPath))
      }
    } else {
      const indexPath = path.join(sourceDir.path, sourceDir.routes.index)
      rel = lib.forwardSlash(path.relative(dirPath, indexPath))
    }

    if (rel) {
      routesJS += `,
  getIndexRoute(location, cb) {
    cb(null, {
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('${rel}').default);
        });
      }
    });
  }`
    }
  }

  let children = []
  if (sourceDir.routes.includes && sourceDir.dirnames) {
    sourceDir.routes.includes.forEach((dirname: string) => {
      if (sourceDir.dirnames.indexOf(dirname) !== -1) {
        children.push(dirname)
      }
    })
  } else {
    sourceDir.dirnames.forEach((dirname: string) => {
      if (sourceDir.routes.excludes && sourceDir.routes.excludes.indexOf(dirname) !== -1) {
        return
      }
      if (!_.startsWith(dirname, '__')) {
        children.push(dirname)
      }
    })
    sourceDir.dirnames.forEach((dirname: string) => {
      if (sourceDir.routes.excludes && sourceDir.routes.excludes.indexOf(dirname) !== -1) {
        return
      }
      if (_.startsWith(dirname, '__')) {
        children.push(dirname)
      }
    })
  }
  if (children.length > 0) {
    routesJS += `,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [${children.map((child: string) => {
        return `
        require('./${child}/routes').default`
        }).join(',')}
      ]);
    });
  }`
  }
  routesJS += `
}`

  return routesJS
}

export function getRoutePath(sourceDir: models.SourceDir): string {
  if (sourceDir.parent) {
    return lib.urlJoin(getRoutePath(sourceDir.parent), sourceDir.routes.path)
  }
  return sourceDir.routes.path
}
