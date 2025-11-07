<script setup lang="ts">
import { i18n } from '../../../i18n'
import OptionalColorField from '../../../modals/form/OptionalColorField.vue'
import PropertiesModal from '../../../modals/form/PropertiesModal.vue'
import { defaultHoldNoteProperties, setDefaultHoldNoteProperties } from '../../tools/holdNote'
import { useProperties } from '../../utils/properties'

const createModel = useProperties(() => defaultHoldNoteProperties, setDefaultHoldNoteProperties)

const color = createModel('color')
</script>

<template>
    <PropertiesModal :title="i18n.commands.holdNote.modal.title">
        <!--OptionalColorField v-model="color" /-->
    </PropertiesModal>
</template>
