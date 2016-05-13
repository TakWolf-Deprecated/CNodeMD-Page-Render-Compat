
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

var MINUTE = 60 * 1000;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
var MONTH = 31 * DAY;
var YEAR = 12 * MONTH;

Vue.filter('recentlyTimeText', function (time) {
    var offset = Date.parse(new Date()) - Date.parse(new Date(time));
    if (offset > YEAR) {
        return Math.floor(offset / YEAR) + "年前";
    } else if (offset > MONTH) {
        return Math.floor(offset / MONTH) + "个月前";
    } else if (offset > WEEK) {
        return Math.floor(offset / WEEK) + "周前";
    } else if (offset > DAY) {
        return Math.floor(offset / DAY) + "天前";
    } else if (offset > HOUR) {
        return Math.floor(offset / HOUR) + "小时前";
    } else if (offset > MINUTE) {
        return Math.floor(offset / MINUTE) + "分钟前";
    } else {
        return "刚刚";
    }
});

Vue.filter('tabName', function (topic) {
    if (topic.top) {
        return '置顶';
    } else {
        switch (tab) {
            case 'share':
                return '分享';
            case 'ask':
                return '问答';
            case 'job':
                return '招聘';
            default:
                return '全部';
        }
    }
});

var vmPage = new Vue({
    el: '#page',
    data: {
        accessToken: '',
        topic: {},
        positionMap: {}
    },
    methods: {

        collectTopic: function (topic) {
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
