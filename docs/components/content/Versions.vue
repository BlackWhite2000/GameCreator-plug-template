<script setup lang="ts">
import { get, apiUrl } from "../../apis/axios";
import type { DataType } from '../../apis/type'
import { appType, appTypeId } from '../../constants/index'
import { serverApiParam } from '../../constants/apis'
import { useData } from '../../composables/usedata'

const data = ref<DataType['data']>()

try {
  const response = await get(`${apiUrl}${serverApiParam}${appTypeId}`)
  data.value = response.data
  if (data.value) useData().response = data.value
} catch (error) {
  console.error(error)
}

</script>

<template>
  <div class="leading-8 lt-lg:text-center">
    <div class="mb-15px">
      <p class="text-xl font-bold">
        {{ appType }}最新版本号
      </p>
      <p>
        {{ data?.versions ? `v${data.versions}` : '获取失败' }}
      </p>
    </div>
    <div class="mb-15px">
      <p class="text-xl font-bold">
        {{ appType }}下载地址
      </p>
      <p>
        {{ data?.url ? `${data.url}` : '请联系作者' }}
      </p>
    </div>
    <div>
      <p class="text-xl font-bold">
        {{ appType }}问题建议反馈
      </p>
      <p>
        {{ data?.feedback ? `${data.feedback}` : '请联系作者' }}
      </p>
    </div>
  </div>
</template>
