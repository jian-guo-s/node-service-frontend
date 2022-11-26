<template>
  <div class="mx-40 dark:bg-black dark:text-white bg-white text-red-500">
    <div class="text-[32px] font-bold">Support Chain</div>
    <div class="card-div">
      <div class="card-item" @click="setCurrId(item.id)" :class="{'check-border':checkCurrId === item.id }" v-for="(item, index2) in data.items" :key="index2">
        <div>
          <img
            :src="getImageURL(`${item.imageName}.png`)"
          />
        </div>
        <div class="col-span-5">
          <div class="card-title">{{ item.name }}</div>
          <div class="card-desc show-line">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@btnColor: #E2B578;
.card-div{
  @apply grid grid-cols-2 gap-4;
}
.card-item{
  @apply p-4 grid grid-cols-6 gap-4 cursor-pointer;
  border: 1px solid #EFEFEF;
  border-radius: 12px;
}
.card-img-div{
  @apply flex justify-center;
}
.card-item img{
  width: 64px;
  height: 64px;
  border-radius: 12px;
}
.card-title{
  @apply font-semibold;
  font-size: 16px;
  color: #121211;
}
:deep(.ant-btn){
  border-radius: 8px;
}
:deep(.ant-btn-primary){
  width: 120px;
  height: 40px;
}
:deep(.ant-btn-primary), :deep(.ant-btn-primary:hover), :deep(.ant-btn-primary:focus){
  border-color: @btnColor;
  background: @btnColor;
}
</style>