const {
  get_message_id_note_from_hmail,
  get_shared_rabbitmq_object_from_server,
  load_mailixer_config_file,
} = require('../../lib/mailixer')
const haraka_server = require('./server')
exports.register = function () {
  this.register_hook('delivered', 'handle_delivered')

  const plugin = this
  load_mailixer_config_file(plugin)
}

exports.handle_delivered = function (next, hmail, params) {
  const plugin = this
  const message_id = get_message_id_note_from_hmail(hmail, plugin.cfg)
  const rabbitmq = get_shared_rabbitmq_object_from_server(haraka_server)

  const publisher = rabbitmq.createPublisher()

  publisher
    .send(
      {
        exchange: 'mailixer-feedback-exchange',
        routingKey: 'feedback',
      },
      {
        type: 'DELIVERED',
        responseMessage: params.response,
        messageId: message_id,
        timestamp: Date.now(),
      }
    )
    .then(() => {
      plugin.loginfo(
        `sent delivered message (Message-ID: ${message_id}) to RabbitMQ`
      )
      publisher.close()
    })
}
