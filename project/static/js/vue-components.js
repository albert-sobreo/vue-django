Vue.component('navbar', {
    delimiters: ['[[', ']]'],
    props: [
        'id'
    ],
    data: function(){
        return{
            user: {
                first_name: null,
                last_name: null,
                username: null,
                article: null,
            }
        }
    },

    mounted(){
        axios
        .get(`/api/user/${this.id}`)
        .then(res=>this.user=res.data)
    },
    
    template: 
    `<div class="d-flex my-nav justify-content-between align-items-center">
        <div class="d-flex my-nav-item my-nav-name">
            <span data-toggle='dropdown'>[[user.first_name]] [[user.last_name]]</span>
            <div class="dropdown-menu p-3">
                <p class="text-muted regular font-size-12">Username: [[user.username]]</p>
                <p class="text-muted regular font-size-12">Article: [[user.article]]</p>
            </div>
        </div>
        <div class="d-flex align-items-end my-nav-item">
            <a href="/logout/">Logout</a>
        </div>
    </div>`
})