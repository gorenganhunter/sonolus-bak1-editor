<script setup lang="ts">
import type { Ease } from '../../chart'
import { i18n } from '../../i18n'
import OptionalSelectField from './OptionalSelectField.vue'

const modelValue = defineModel<Ease | undefined>({ required: true })
</script>

<template>
    <OptionalSelectField
        v-model="modelValue"
        :label="i18n.modals.form.ease.label"
        :options="[
  [ i18n.modals.form.ease.linear, EaseType.LINEAR ],
  [ i18n.modals.form.ease.inSine, EaseType.IN_SINE ],
  [ i18n.modals.form.ease.outSine, EaseType.OUT_SINE ],
  [ i18n.modals.form.ease.inOutSine, EaseType.IN_OUT_SINE ],
  [ i18n.modals.form.ease.outInSine, EaseType.OUT_IN_SINE ],
  [ i18n.modals.form.ease.inQuad, EaseType.IN_QUAD ],
  [ i18n.modals.form.ease.outQuad, EaseType.OUT_QUAD ],
  [ i18n.modals.form.ease.inOutQuad, EaseType.IN_OUT_QUAD ],
  [ i18n.modals.form.ease.outInQuad, EaseType.OUT_IN_QUAD ],
  [ i18n.modals.form.ease.inCubic, EaseType.IN_CUBIC ],
  [ i18n.modals.form.ease.outCubic, EaseType.OUT_CUBIC ],
  [ i18n.modals.form.ease.inOutCubic, EaseType.IN_OUT_CUBIC ],
  [ i18n.modals.form.ease.outInCubic, EaseType.OUT_IN_CUBIC ],
  [ i18n.modals.form.ease.inQuart, EaseType.IN_QUART ],
  [ i18n.modals.form.ease.outQuart, EaseType.OUT_QUART ],
  [ i18n.modals.form.ease.inOutQuart, EaseType.IN_OUT_QUART ],
  [ i18n.modals.form.ease.outInQuart, EaseType.OUT_IN_QUART ],
  [ i18n.modals.form.ease.inQuint, EaseType.IN_QUINT ],
  [ i18n.modals.form.ease.outQuint, EaseType.OUT_QUINT ],
  [ i18n.modals.form.ease.inOutQuint, EaseType.IN_OUT_QUINT ],
  [ i18n.modals.form.ease.outInQuint, EaseType.OUT_IN_QUINT ],
  [ i18n.modals.form.ease.inExpo, EaseType.IN_EXPO ],
  [ i18n.modals.form.ease.outExpo, EaseType.OUT_EXPO ],
  [ i18n.modals.form.ease.inOutExpo, EaseType.IN_OUT_EXPO ],
  [ i18n.modals.form.ease.outInExpo, EaseType.OUT_IN_EXPO ],
  [ i18n.modals.form.ease.inCirc, EaseType.IN_CIRC ],
  [ i18n.modals.form.ease.outCirc, EaseType.OUT_CIRC ],
  [ i18n.modals.form.ease.inOutCirc, EaseType.IN_OUT_CIRC ],
  [ i18n.modals.form.ease.outInCirc, EaseType.OUT_IN_CIRC ],
  [ i18n.modals.form.ease.inBack, EaseType.IN_BACK ],
  [ i18n.modals.form.ease.outBack, EaseType.OUT_BACK ],
  [ i18n.modals.form.ease.inOutBack, EaseType.IN_OUT_BACK ],
  [ i18n.modals.form.ease.outInBack, EaseType.OUT_IN_BACK ],
  [ i18n.modals.form.ease.inElastic, EaseType.IN_ELASTIC ],
  [ i18n.modals.form.ease.outElastic, EaseType.OUT_ELASTIC ],
  [ i18n.modals.form.ease.inOutElastic, EaseType.IN_OUT_ELASTIC ],
  [ i18n.modals.form.ease.outInElastic, EaseType.OUT_IN_ELASTIC ],
  [ i18n.modals.form.ease.zero, EaseType.ZERO ],
  [ i18n.modals.form.ease.one, EaseType.ONE ]
        ]"
    />


</template>
