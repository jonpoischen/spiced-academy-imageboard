(function() {

    new Vue({
        el: '#main',
        data: {
            heading: 'My Vue App',
            greetee: 'World',
            cities: [],
            className: '',
            images: []
        },
        created: function() {
            console.log("created");
        },
        mounted: function() {
            console.log("mounted");

            var self = this;

            axios.get('/cities').then(function(response) {
                self.cities = response.data;
            }).catch(function(err) {
                console.log(err);
            });

            axios.get('/images').then(function(response) {
                self.images = response.data;
            }).catch(function(err) {
                console.log(err);
            });

        },
        updated: function() {
            console.log("updated");
        },
        methods: {
            handleClick: function(e) {
                console.log('submits ' + this.greetee);
            },
            handleMousedown: function(city) {
                console.log(city.name, city.country);
            }
        }
    });
})();

// <input v-model="imageToUplaod.title" name="title">
// <input v-model="imageToUplaod.desc" name="desc">
