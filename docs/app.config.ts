import { appDescription, appName } from './constants/index'

export default defineAppConfig({
  docus: {
    title: appName,
    description: appDescription,
    aside: {
      level: 1,
      collapsed: false,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
  },
})
