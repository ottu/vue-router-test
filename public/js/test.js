// 右ペイン用のコンポーネント
var Form = Vue.extend({
    template: '{{action}}',
});

// 左ペインの要素と右ペインの要素を作って繋げる為のデータ
var contents = [
    {
        "path": "/test",
        "title": "aaa",
        "component": Form,
        "action": "/api"
    }
];

// 左ペイン用のコンポーネント
var Main = Vue.extend({
    template: '<div class="col-md-4">' +
                '<ul class="nav nav-pills nav-stacked">' +
                    contents.map(function(val){
                        return '<li><a v-link=\'{ path: "' + val.path + '" }\'>' + val.title + '</a></li>'
                    }).join('') +
                '</ul>' +
              '</div>' +
              '<div class="col-md-8">' +
                '<router-view></router-view>' +
              '</div>'
});

// Router用の routes
var hoge = {
    '/': {
        component: Main,
        subRoutes: {}
    }
};

// contentsから subRoutesを生成する
contents.map(function(val){
    hoge['/'].subRoutes[val.path] = {
        component: val.component.extend({
            data: function(){ return { action: val.action }; }
        })
    };
});


// アプリケーション開始
var App = Vue.extend({});

var router = new VueRouter();
router.map(hoge);
router.start(App, '#app');

router.go('/');
