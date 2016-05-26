
var accessToken = 'your access token';

function test() {
    fetch('https://cnodejs.org/api/v1/messages?accesstoken=' + accessToken + '&mdrender=true')
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            if (json.success) {
                var messages = json.data.hasnot_read_messages.concat(json.data.has_read_messages);
                messages.forEach(function (message) {
                    message.has_read = false;
                    message.reply.content_html = message.reply.content;
                });
                updateMessages(messages);
            } else {
                console.log(json.error_msg);
            }
        })
        .catch(function (e) {
           console.error(e);
        });
}

setTimeout(test, 2000);
