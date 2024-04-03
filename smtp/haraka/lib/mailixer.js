exports.load_mailixer_config_file = function (plugin) {
  plugin.loginfo('loading configuration')
  plugin.cfg = plugin.config.get('mailixer.ini', function () {
    plugin.load_my_config()
    plugin.loginfo('reloaded configuration')
  })
  plugin.loginfo('loaded configuration')
}

// server.notes does not provide setter and getter, so we have
// to set property directly
exports.share_rabbitmq_object = function (server, rabbitmq) {
  server.notes.rabbitmq = rabbitmq
}
exports.get_shared_rabbitmq_object_from_server = function (server) {
  return server.notes?.rabbitmq
}
exports.get_message_id_note_from_hmail = function (hmail, config) {
  return hmail.todo.notes.get(config.notes.message_id)
}
exports.set_message_id_to_transaction_notes = function (
  message_id,
  transaction,
  config
) {
  transaction.notes.set(config.notes.message_id, message_id)
}
exports.get_message_id_from_connection = function (connection) {
  return connection.transaction.header.get_decoded('Message-ID')
}
