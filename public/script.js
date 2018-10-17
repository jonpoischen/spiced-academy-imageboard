(function() {

    Vue.component('image-modal', {
        template: '#image-modal',
        props: ['id'],
        methods: {
            close: function() {
                this.$emit('close');
            }
        },
        mounted: function() {
            var self = this;
            axios.get('/image-modal', {params: {id: this.id}}).then(function(response) {
                var d = response.data[0];
                self.url = d.url;
                self.username = d.username;
                self.title = d.title;
                self.description = d.description;
                self.created_at = d.created_at;
            }).catch(function(err) {console.log(err)});
        },
        data: function() {
            return {
                url: '',
                username: '',
                title: '',
                description: '',
                created_at: ''
            }
        }
    });

    new Vue({
        el: '#main',
        data: {
            heading: 'Style this title later',
            images: [],
            imageID: '',
            title: '',
            desc: '',
            username: '',
            file: ''
        },
        mounted: function() {
            var self = this;
            axios.get('/images').then(function(response) {
                self.images = response.data;
            }).catch(function(err) {console.log(err)});
        },
        methods: {
            handleFileChange: function(e) {
                this.file = e.target.files[0];
            },
            upload: function() {
                var formData = new FormData;
                formData.append('file', this.file);
                formData.append('desc', this.desc);
                formData.append('title', this.title);
                formData.append('username', this.username);

                var self = this;
                axios.post('/upload', formData).then(function(response) {
                    self.images.unshift(response.data[0]);
                }).catch(function(err) {
                    console.log(err);
                });
            },
            openModal: function(id) {
                this.imageID = id;
            },
            closeModal: function() {
                this.imageID = null;
            }
        }
    });

})();
