angular.module('app').factory('NewsService', ['$rootScope', newsServices]);

function newsServices ($rootScope ) {
    var fakeJsonNews = [
        {
            title: 'Une news',
            description: 'Une description',
            id: '125dfsdf51'
        },
        {
            title: 'Une news',
            description: 'Une description',
            id: '125dfsdf52'
        },
        {
            title: 'Une news',
            description: 'Une description',
            id: '125dfsdf53'
        },
        {
            title: 'Une news',
            description: 'Une description',
            id: '125dfsdf54'
        }
    ];

    return {
        get: get
    };

    function get(limit, page) {
        return fakeJsonNews;
    }


}