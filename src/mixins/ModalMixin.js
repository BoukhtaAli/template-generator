export default {
    name: 'ModalMixin',
    methods: {
        showMsgBox(type) {
            return this.$bvModal.msgBoxConfirm( type ==='add'? 'Please Confirm to Update Table' : (type === 'delete' ? 'Please Confirm to Delete Entity' : ''), {
                        title: 'Confirmation Box',
                        headerClass: 'bg-light text-secondary',
                        size: 'md',
                        buttonSize: 'md',
                        cancelVariant: 'outline-danger',
                        okVariant: 'outline-success',
                        okTitle: 'OK',
                        cancelTitle: 'CANCEL',
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        centered: true
                    })
        }
    }
}