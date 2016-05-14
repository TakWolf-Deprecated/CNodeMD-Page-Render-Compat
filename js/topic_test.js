
var accessToken = 'your access token';

function login() {
    fetch('https://cnodejs.org/api/v1/accesstoken', {method: 'POST', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: 'accesstoken=' + accessToken})
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            if (json.success) {
                console.log('user id : ' + json.id);
                test(json.id);
            } else {
                console.log(json.error_msg);
            }
        })
        .catch(function (e) {
            console.error(e);
        });
}

function test(userId) {
    fetch('https://cnodejs.org/api/v1/topic/5720db8035af8a704195f4db?accesstoken=' + accessToken + '&mdrender=true')
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            if (json.success) {
                json.data.rendered_content = json.data.content;
                json.data.replies.forEach(function (reply) {
                    reply.rendered_content = reply.content;
                });
                updateTopicAndUserId(json.data, userId);
            } else {
                console.log(json.error_msg);
            }
        })
        .catch(function (e) {
            console.error(e);
        });
}

setTimeout(login, 500);

function scrollDown() {
    $('body').animate({scrollTop: $('body')[0].scrollHeight}, 400);
}
