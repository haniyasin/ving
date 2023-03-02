import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ripple from "primevue/ripple";
import styleclass from "primevue/styleclass";
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import Message from 'primevue/message';
import Password from 'primevue/password';
import InputNumber from 'primevue/inputnumber';
import TextArea from 'primevue/textarea';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.directive('ripple', ripple);
    nuxtApp.vueApp.directive('styleclass', styleclass);
    nuxtApp.vueApp.component('Toast', Toast);
    nuxtApp.vueApp.component('Divider', Divider);
    nuxtApp.vueApp.component('Avatar', Avatar);
    nuxtApp.vueApp.component('Message', Message);
    nuxtApp.vueApp.component('Password', Password);
    nuxtApp.vueApp.component('InputNumber', InputNumber);
    nuxtApp.vueApp.component('TextArea', TextArea);

    return {
        provide: {
            toast: nuxtApp.vueApp.config.globalProperties.$toast
        }
    }

});