/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as MoviesRouteImport } from './routes/movies/route'
import { Route as IndexImport } from './routes/index'
import { Route as MoviesIndexImport } from './routes/movies/index'
import { Route as MoviesIdImport } from './routes/movies/$id'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const MoviesRouteRoute = MoviesRouteImport.update({
  id: '/movies',
  path: '/movies',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MoviesIndexRoute = MoviesIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MoviesRouteRoute,
} as any)

const MoviesIdRoute = MoviesIdImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => MoviesRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/movies': {
      id: '/movies'
      path: '/movies'
      fullPath: '/movies'
      preLoaderRoute: typeof MoviesRouteImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/movies/$id': {
      id: '/movies/$id'
      path: '/$id'
      fullPath: '/movies/$id'
      preLoaderRoute: typeof MoviesIdImport
      parentRoute: typeof MoviesRouteImport
    }
    '/movies/': {
      id: '/movies/'
      path: '/'
      fullPath: '/movies/'
      preLoaderRoute: typeof MoviesIndexImport
      parentRoute: typeof MoviesRouteImport
    }
  }
}

// Create and export the route tree

interface MoviesRouteRouteChildren {
  MoviesIdRoute: typeof MoviesIdRoute
  MoviesIndexRoute: typeof MoviesIndexRoute
}

const MoviesRouteRouteChildren: MoviesRouteRouteChildren = {
  MoviesIdRoute: MoviesIdRoute,
  MoviesIndexRoute: MoviesIndexRoute,
}

const MoviesRouteRouteWithChildren = MoviesRouteRoute._addFileChildren(
  MoviesRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/movies': typeof MoviesRouteRouteWithChildren
  '': typeof LayoutRoute
  '/movies/$id': typeof MoviesIdRoute
  '/movies/': typeof MoviesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutRoute
  '/movies/$id': typeof MoviesIdRoute
  '/movies': typeof MoviesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/movies': typeof MoviesRouteRouteWithChildren
  '/_layout': typeof LayoutRoute
  '/movies/$id': typeof MoviesIdRoute
  '/movies/': typeof MoviesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/movies' | '' | '/movies/$id' | '/movies/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/movies/$id' | '/movies'
  id: '__root__' | '/' | '/movies' | '/_layout' | '/movies/$id' | '/movies/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MoviesRouteRoute: typeof MoviesRouteRouteWithChildren
  LayoutRoute: typeof LayoutRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MoviesRouteRoute: MoviesRouteRouteWithChildren,
  LayoutRoute: LayoutRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/movies",
        "/_layout"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/movies": {
      "filePath": "movies/route.tsx",
      "children": [
        "/movies/$id",
        "/movies/"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx"
    },
    "/movies/$id": {
      "filePath": "movies/$id.tsx",
      "parent": "/movies"
    },
    "/movies/": {
      "filePath": "movies/index.tsx",
      "parent": "/movies"
    }
  }
}
ROUTE_MANIFEST_END */
