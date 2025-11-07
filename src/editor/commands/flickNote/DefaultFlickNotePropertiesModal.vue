<script setup lang="ts">
import { i18n } from '../../../i18n'
import OptionalColorField from '../../../modals/form/OptionalColorField.vue'
import PropertiesModal from '../../../modals/form/PropertiesModal.vue'
import { defaultFlickNoteProperties, setDefaultFlickNoteProperties } from '../../tools/flickNote'
import { useProperties } from '../../utils/properties'

const createModel = useProperties(() => defaultFlickNoteProperties, setDefaultFlickNoteProperties)

const color = createModel('color')
</script>

<template>
    <PropertiesModal :title="i18n.commands.flickNote.modal.title">
        <!--OptionalColorField v-model="color" /-->
    </PropertiesModal>
</template>
