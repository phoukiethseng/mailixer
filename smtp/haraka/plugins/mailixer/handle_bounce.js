const haraka_server = require('./server')
const {
  load_mailixer_config_file,
  get_shared_rabbitmq_object_from_server,
  get_message_id_note_from_hmail,
} = require('../../lib/mailixer')

exports.register = function () {
  this.register_hook('bounce', 'handle_bounce')

  this.loginfo('mailixer_bounce successfully registered hooks')

  const plugin = this
  load_mailixer_config_file(plugin)
}

exports.handle_bounce = function (next, hmail, error) {
  const plugin = this
  const message_id = get_message_id_note_from_hmail(hmail, plugin.cfg)
  this.logalert(
    `bounced email for message id: ${message_id}, reason: ${error.message}`
  )

  const rabbitmq = get_shared_rabbitmq_object_from_server(haraka_server)

  if (!rabbitmq) {
    plugin.logerr('Cannot obtain rabbitmq connection object')
    // For now, do nothing if rabbitmq object is not accessible
    return next('OK')
  }

  const publisher = rabbitmq.createPublisher()

  publisher
    .send(
      {
        exchange: 'mailixer-feedback-exchange',
        routingKey: 'feedback',
        durable: true,
      },
      {
        type: 'BOUNCE',
        reason: error.message,
        messageId: message_id,
        timestamp: Date.now(),
      }
    )
    .then((r) => {
      plugin.loginfo('Sent bounce message to RabbitMQ')
      publisher.close()
    })

  next('OK') // This prevent Haraka from forwarding bounced email back to sender address
}
