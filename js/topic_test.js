
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
    fetch('https://cnodejs.org/api/v1/topic/58eee565a92d341e48cfe7fc?accesstoken=' + accessToken + '&mdrender=true')
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            if (json.success) {
                json.data.content_html = json.data.content;
                json.data.replies.forEach(function (reply) {
                    reply.content_html = reply.content;
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
    window.scrollTo(0, document.body.clientHeight);
}
