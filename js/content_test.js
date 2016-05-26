
function test(userId) {
    fetch('https://cnodejs.org/api/v1/topic/559bd1b91e5c761761468884?mdrender=true')
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            if (json.success) {
                json.data.content_html = json.data.content;
                json.data.replies.forEach(function (reply) {
                    reply.content_html = reply.content;
                });
                updateContent(json.data.content_html);
            } else {
                console.log(json.error_msg);
            }
        })
        .catch(function (e) {
            console.error(e);
        });
}

setTimeout(test, 500);
