const {
  set_message_id_to_transaction_notes,
  get_message_id_from_connection,
  load_mailixer_config_file,
} = require('../../lib/mailixer')
exports.register = function () {
  // This hook will call just before sending actual email to remote server
  this.register_hook(
    'pre_send_trans_email',
    'append_message_id_to_transaction_notes'
  )
  const plugin = this
  load_mailixer_config_file(plugin)
}

exports.append_message_id_to_transaction_notes = function (next, connection) {
  const plugin = this
  let message_id = get_message_id_from_connection(connection)

  // Strip out curly bracket and trailing CRLF
  const regex = /^<(?<message_id>.*)>[\r\n]*/
  message_id = regex.exec(message_id).groups.message_id

  set_message_id_to_transaction_notes(
    message_id,
    connection.transaction,
    plugin.cfg
  )

  this.loginfo(
    `added Message-ID (${message_id}) to transaction notes named: ${plugin.cfg.notes.message_id}`
  )

  next()
}
