//FUNCTION TO GET CSRF_TOKEN
function getCookie(name) {
    if (!document.cookie) {
        return null;
    }

    const xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
        return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

//MAIN VUE SCRIPT

// APP
Vue.config.silent = false;
Vue.config.devtools = true;
var app = new Vue({
    delimiters: ['[[', ']]'],

    el: '#app',

    data: {
        config: {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        },

        authorsList: [],

        authorInput: {
            id: null,
            first_name: null,
            last_name: null,
        }
    },

    methods: {
        refreshList(){
            axios
            .get('/api/author/')
            .then(res=>this.authorsList=res.data)
        },
        submitAuthor(){
            if (this.authorInput.id){
                axios
                .put(`api/author/${this.authorInput.id}/`, this.authorInput, this.config)
                .then(res=>this.refreshList())

                this.authorInput.id = null;
                this.authorInput.first_name = null;
                this.authorInput.last_name = null
                return
            }

            axios
            .post('/api/author/', this.authorInput, this.config)
            .then(res=>this.refreshList())

            this.authorInput.id = null;
            this.authorInput.first_name = null;
            this.authorInput.last_name = null
            return
        },
        deleteAuthor(id){
            axios
            .delete(`/api/author/${id}/`, this.config)
            .then(res=>this.refreshList())
        },
        editAuthor(id){
            this.authorInput.id = this.authorsList.find(author=>author.id === id).id
            this.authorInput.first_name = this.authorsList.find(author=>author.id === id).first_name
            this.authorInput.last_name = this.authorsList.find(author=>author.id === id).last_name
        }
    },

    mounted(){
        this.refreshList()
    }

})


// APP2
var app2 = new Vue({
    delimiters: ['[[', ']]'],
    
    el: '#app2',

    data: {
        config: {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        },

        authorsList: [],

        articlesList: [],

        articleInput: {
            id: null,
            author: null,
            title: null,
            body: null
        }
    },

    methods: {
        refreshList(){
            axios
            .get('/api/article/')
            .then(res=>this.articlesList=res.data)

            axios
            .get('/api/author')
            .then(res=>this.authorsList=res.data)
        },
        getAuthorName(id){
            return this.authorsList.find(author=>author.id === id).first_name + " " + this.authorsList.find(author=>author.id === id).last_name
        },
        editArticle(id){
            this.articleInput.id = this.articlesList.find(article=>article.id === id).id
            this.articleInput.title = this.articlesList.find(article=>article.id === id).title
            this.articleInput.body = this.articlesList.find(article=>article.id === id).body
            this.articleInput.author = this.articlesList.find(article=>article.id ===id).author
        },
        deleteArticle(id){
            axios
            .delete(`/api/article/${id}/`, this.config)
            .then(res=>this.refreshList())
        },
        submitArticle(){
            if(this.articleInput.id){
                axios
                .put(`/api/article/${this.articleInput.id}/`, this.articleInput, this.config)
                .then(res=>this.refreshList())

                this.articleInput.id = null;
                this.articleInput.title = null;
                this.articleInput.body = null;
                this.articleInput.author = null;
            }
            axios
            .post(`/api/article/`, this.articleInput, this.config)
            .then(res=>this.refreshList())
            
            this.articleInput.id = null;
            this.articleInput.title = null;
            this.articleInput.body = null;
            this.articleInput.author = null;
        }
    },

    mounted(){
        this.refreshList()
    }
})