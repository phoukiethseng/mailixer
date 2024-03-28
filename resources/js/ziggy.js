const Ziggy = {
  url: 'http://localhost',
  port: null,
  defaults: {},
  routes: {
    'sanctum.csrf-cookie': {
      uri: 'sanctum/csrf-cookie',
      methods: ['GET', 'HEAD'],
    },
    'log-viewer.hosts': {
      uri: 'log-viewer/api/hosts',
      methods: ['GET', 'HEAD'],
    },
    'log-viewer.folders': {
      uri: 'log-viewer/api/folders',
      methods: ['GET', 'HEAD'],
    },
    'log-viewer.folders.request-download': {
      uri: 'log-viewer/api/folders/{folderIdentifier}/download/request',
      methods: ['GET', 'HEAD'],
      parameters: ['folderIdentifier'],
    },
    'log-viewer.folders.clear-cache': {
      uri: 'log-viewer/api/folders/{folderIdentifier}/clear-cache',
      methods: ['POST'],
      parameters: ['folderIdentifier'],
    },
    'log-viewer.folders.delete': {
      uri: 'log-viewer/api/folders/{folderIdentifier}',
      methods: ['DELETE'],
      parameters: ['folderIdentifier'],
    },
    'log-viewer.files': {
      uri: 'log-viewer/api/files',
      methods: ['GET', 'HEAD'],
    },
    'log-viewer.files.request-download': {
      uri: 'log-viewer/api/files/{fileIdentifier}/download/request',
      methods: ['GET', 'HEAD'],
      parameters: ['fileIdentifier'],
    },
    'log-viewer.files.clear-cache': {
      uri: 'log-viewer/api/files/{fileIdentifier}/clear-cache',
      methods: ['POST'],
      parameters: ['fileIdentifier'],
    },
    'log-viewer.files.delete': {
      uri: 'log-viewer/api/files/{fileIdentifier}',
      methods: ['DELETE'],
      parameters: ['fileIdentifier'],
    },
    'log-viewer.files.clear-cache-all': {
      uri: 'log-viewer/api/clear-cache-all',
      methods: ['POST'],
    },
    'log-viewer.files.delete-multiple-files': {
      uri: 'log-viewer/api/delete-multiple-files',
      methods: ['POST'],
    },
    'log-viewer.logs': { uri: 'log-viewer/api/logs', methods: ['GET', 'HEAD'] },
    'log-viewer.folders.download': {
      uri: 'log-viewer/api/folders/{folderIdentifier}/download',
      methods: ['GET', 'HEAD'],
      parameters: ['folderIdentifier'],
    },
    'log-viewer.files.download': {
      uri: 'log-viewer/api/files/{fileIdentifier}/download',
      methods: ['GET', 'HEAD'],
      parameters: ['fileIdentifier'],
    },
    'log-viewer.index': {
      uri: 'log-viewer/{view?}',
      methods: ['GET', 'HEAD'],
      wheres: { view: '(.*)' },
      parameters: ['view'],
    },
    'ignition.healthCheck': {
      uri: '_ignition/health-check',
      methods: ['GET', 'HEAD'],
    },
    'ignition.executeSolution': {
      uri: '_ignition/execute-solution',
      methods: ['POST'],
    },
    'ignition.updateConfig': {
      uri: '_ignition/update-config',
      methods: ['POST'],
    },
    home: { uri: '/', methods: ['GET', 'HEAD'] },
    login: { uri: 'login', methods: ['GET', 'HEAD'] },
    logout: { uri: 'logout', methods: ['GET', 'HEAD'] },
    'subscribe.index': {
      uri: 'subscribe_page/{token}',
      methods: ['GET', 'HEAD'],
      parameters: ['token'],
    },
    'subscribe.success': {
      uri: 'subscribe_page/{token}/success',
      methods: ['GET', 'HEAD'],
      parameters: ['token'],
    },
    unsubscribe: {
      uri: 'unsubscribe/{unsubscribeToken}',
      methods: ['GET', 'HEAD'],
      parameters: ['unsubscribeToken'],
    },
    'unsubscribe.oneClick': {
      uri: 'unsubscribe/{unsubscribeToken}',
      methods: ['POST'],
      parameters: ['unsubscribeToken'],
    },
    'dashboard.index': { uri: 'dashboard', methods: ['GET', 'HEAD'] },
    'dashboard.customization': {
      uri: 'dashboard/customize_page',
      methods: ['GET', 'HEAD'],
    },
    'dashboard.subscribers': {
      uri: 'dashboard/all_subscribers_page',
      methods: ['GET', 'HEAD'],
    },
    'dashboard.composeNewsletter': {
      uri: 'dashboard/compose_newsletter_page',
      methods: ['GET', 'HEAD'],
    },
    'dashboard.draftNewsletter': {
      uri: 'dashboard/draft_newsletter_page',
      methods: ['GET', 'HEAD'],
    },
    'dashboard.batch.unsubscribe': {
      uri: 'dashboard/batchUnsubscribe',
      methods: ['DELETE'],
    },
    'dashboard.batch.blacklist': {
      uri: 'dashboard/batchBlacklist',
      methods: ['POST'],
    },
    'dashboard.subscription.records': {
      uri: 'dashboard/getSubscriptionRecords/{from}/{to}',
      methods: ['GET', 'HEAD'],
      parameters: ['from', 'to'],
    },
    'setting.account': { uri: 'user/settings', methods: ['GET', 'HEAD'] },
    'user.profile': {
      uri: 'user/profilePicture/{userId}',
      methods: ['GET', 'HEAD'],
      parameters: ['userId'],
    },
    'register.page': { uri: 'register', methods: ['GET', 'HEAD'] },
    'verification.verify': {
      uri: 'email/verify/{id}/{hash}',
      methods: ['GET', 'HEAD'],
      parameters: ['id', 'hash'],
    },
  },
}
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes)
}
export { Ziggy }
