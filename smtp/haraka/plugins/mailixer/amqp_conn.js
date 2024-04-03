const rabbitmq_client = require('rabbitmq-client')
const {
  load_mailixer_config_file,
  share_rabbitmq_object,
  get_shared_rabbitmq_object_from_server,
} = require('../../lib/mailixer')

const haraka_server = require('./server')
const process = require('node:process')

exports.register = function () {
  this.register_hook('init_child', 'create_rabbitmq_amqp_connection')
  load_mailixer_config_file(this)
}

exports.create_rabbitmq_amqp_connection = function (next, server) {
  // Create global connection scoped to a child process life-cycle
  // meaning a rabbitmq connection is created when child process created
  // and destroyed when child process exit

  const rabbitmq_cfg = this.cfg.rabbitmq // RabbitMQ related configuration
  const plugin = this

  const rabbitmq_conn_string = `amqp://${rabbitmq_cfg.user}:${rabbitmq_cfg.pass}@${rabbitmq_cfg.host}:${rabbitmq_cfg.port}`

  // For debugging only
  const rabbitmq_conn_string_redacted = `amqp://${rabbitmq_cfg.user}:***@${rabbitmq_cfg.host}:${rabbitmq_cfg.port}`
  plugin.logdebug(`connected to RabbitMQ: ${rabbitmq_conn_string_redacted}`)

  const rabbitmq = new rabbitmq_client.Connection(rabbitmq_conn_string)

  rabbitmq.on('error', (error) => {
    plugin.logcrit(`error on RabbitMQ connection, error: ${error.toString()}`) // Redact connection password
  })

  rabbitmq.on('connection', () => {
    plugin.loginfo('established to RabbitMQ')
    share_rabbitmq_object(server, rabbitmq)
    plugin.loginfo('shared rabbitmq object to server.notes')

    // Declare exchange and queue and routing
    rabbitmq.exchangeDeclare({
      exchange: 'mailixer-feedback-exchange',
      type: 'topic',
      durable: true,
    })
    rabbitmq.queueDeclare({
      queue: 'mailixer-feedback-queue',
      durable: true,
    })
    rabbitmq.queueBind({
      routingKey: 'feedback',
      queue: 'mailixer-feedback-queue',
      exchange: 'mailixer-feedback-exchange',
    })
  })

  next()
}

// NOTES: shutdown hook is currently not working, figure this out later

exports.shutdown = function () {
  // Properly close RabbitMQ connection
  const server = haraka_server
  if (server.notes.rabbitmq) {
    const rabbitmq = get_shared_rabbitmq_object_from_server(server)
    rabbitmq.close()
    server.loginfo('successfully close RabbitMQ connection')
  }
}
