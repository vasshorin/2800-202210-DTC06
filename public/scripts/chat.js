// userDetails = null

// function getUserobj() {
//     $.ajax({
//         url: 'http://localhost:5002/userId',
//         type: 'GET',
//         success: talkjs
//     })
// }

// Working example from SDK documentation, link: https://talkjs.com/docs/sdk/javascript/getting-started/
(function (t, a, l, k, j, s) { 
    s = a.createElement('script');
    s.async = 1; 
    s.src = "https://cdn.talkjs.com/talk.js";
    a.head.appendChild(s);
    k = t.Promise;
    t.Talk = {
        v: 3,
        ready: {
            then: function (f) {
                if (k) return new k(function (r, e) {
                    l.push([f, r, e])
                });
                l
                    .push([f])
            },
            catch: function () {
                return k && new k()
            },
            c: l
        }
    };
})(window, document, []);

// 
Talk.ready.then(function () {
    // userDetails = null
    // $.ajax({
    //     url: 'http://localhost:5002/userId',
    //     type: 'GET',
    //     success: (userObj) => {
    //         userDetails = userObj[0]
    //     }
    // })
    var other = new Talk.User({
        id: '7654321',
        name: 'Tony',
        email: 'tony@example.com',
        photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
    });
    var me = new Talk.User({
        id: '123456',
        name: 'Vasily',
        email: 'vasily@test.com',
        photoUrl: 'https://demo.talkjs.com/img/alice.jpg',
    });
    window.talkSession = new Talk.Session({
        appId: 'teJYdfcK',
        me: me,
    });

    var conversation = talkSession.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
    );
    conversation.setAttributes({
        subject: 'Test title',
    });
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var inbox = talkSession.createInbox({
        selected: conversation
    });

    inbox.mount(document.getElementById('talkjs-container'));
});
// }

// function setup() {
//     getUserobj()
// }

// $(document).ready(setup)