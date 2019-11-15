<template>
    <div class="mc-login">
        <div class="q-pa-md">

            <div class="row justify-center">
                <div class="col-6">
                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                        <q-input filled v-model="name" label="Your name *" lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']" />

                        <q-input filled type="number" v-model="age" label="Your age *" lazy-rules :rules="[
                                val => val !== null && val !== '' || 'Please type your age',
                                val => val > 0 && val < 100 || 'Please type a real age'
                              ]" />
                        <div>
                            <q-btn label="Submit" type="submit" color="primary" />
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </div>
            </div>
        </div>
        <div class="q-pa-md" style="max-width: 400px">

        </div>
    </div>
</template>
<script>
    export default {
        name: 'McLogin',
        data() {
            return {
                name: null,
                age: null,
                accept: false
            }
        },
        components: {

        },
        methods: {
            onSubmit() {
                if (this.accept !== true) {
                    this.$q.notify({
                        color: 'red-5',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'You need to accept the license and terms first'
                    })
                } else {
                    this.$q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        icon: 'cloud_done',
                        message: 'Submitted'
                    })
                }
            },
            onReset() {
                this.name = null
                this.age = null
                this.accept = false
            }
        },
        created() {

        },
    }
</script>

<style>
    .mc-login {
        margin-top: 200px;
        text-align: center;
    }

    .login-from {
        padding-bottom: 20px;
    }
</style>