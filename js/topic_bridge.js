
window.topicBridge = {

    onScrollUp: function () {
        console.log('on scroll up');
    },

    onScrollDown: function () {
        console.log('on scroll down');
    },

    collectTopic: function (topicId) {
        vmPage.topic.is_collect = true;
    },

    decollectTopic: function (topicId) {
        vmPage.topic.is_collect = false;
    },

    upReply: function (replyJson) {
        var reply = JSON.parse(replyJson);
        if (reply.ups.indexOf(vmPage.accessToken) == -1) {
            reply.ups.push(vmPage.accessToken);
        } else {
            reply.ups.splice(reply.ups.indexOf(vmPage.accessToken), 1);
        }
        updateReply(reply);
    },

    at: function (targetJson, targetPosition) {
        alert('at@' + targetPosition + ' : ' + targetJson);
    },
    
    openUser: function (loginName) {
        alert('open user : ' + loginName);
    }
    
};
