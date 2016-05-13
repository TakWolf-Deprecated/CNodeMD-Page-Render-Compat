
$(document).ready(function () {
    var lastScrollTop = $(document).scrollTop();
    $(document).scroll(function () {
        var nowScrollTop = $(this).scrollTop();
        var offset = nowScrollTop - lastScrollTop;
        lastScrollTop = nowScrollTop;
        if (offset > 0) {
            window.topicBridge.onScrollDown();
        } else {
            window.topicBridge.onScrollUp();
        }
    });
});

var vmPage = new Vue({
    el: '#page',
    data: {
        accessToken: '',
        topic: {},
        positionMap: {}
    },
    methods: {

        collectTopic: function () {
            if (topic.is_collect) {
                window.topicBridge.decollectTopic(topic.id);
            } else {
                window.topicBridge.collectTopic(topic.id);
            }
        },

        upReply: function (reply) {
            window.topicBridge.upReply(JSON.stringify(reply));
        },

        at: function (reply) {
            window.topicBridge.at(JSON.stringify(reply), positionMap[reply.id]);
        },

        openUser: function (loginName) {
            window.topicBridge.openUser(loginName);
        }
        
    }
});

vmPage.$watch('topic', function () {
    $('.markdown-text img').click(function () {
        var img = $(this);
        if (img.parent('a').length <= 0) {
            window.imageBridge.openImage(img.attr('src'));
        }
    });
});

function updateTopicAndAccessToken(topic, accessToken) {
    vmPage.topic = topic;
    vmPage.accessToken = accessToken;
    var positionMap = {};
    if (topic.replies) {
        for (var i = 0; i < topic.replies.length; i++) {
            var reply = topic.replies[i];
            positionMap[reply.id] = i;
        }
    }
    vmPage.positionMap = positionMap;
}

function updateTopicCollect(isCollect) {
    if (vmPage.topic) {
        vmPage.topic.is_collect = isCollect;
    }
}

function updateReply(reply) {
    if (vmPage.topic && vmPage.topic.replies) {
        for (var i = 0; i < vmPage.topic.replies.length; i++) {
            var replyN = vmPage.topic.replies[i];
            if (replyN.id === reply.id) {
                vmPage.topic.replies[i] = reply;
                break;
            }
        }
    }
}

function appendReply(reply) {
    if (vmPage.topic) {
        if (!vmPage.topic.replies) {
            vmPage.topic.replies = [];
        }
        vmPage.topic.replies.push(reply);
    }
}
