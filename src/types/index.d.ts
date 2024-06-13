declare module 'vue' {
  export interface VNode {
    destroy?: any
  }
}

declare module 'axios' {
  /**
   * Costom Axios Field.
   */
  export interface AxiosRequestConfig {
    redirect?: string
    /**
     * 默认需要驼峰转译, 默认为 true
     */
    needCamelCase?: boolean
  }
}

declare module 'pinia' {
  /**
   * Costom Pinia Field.
   */
  export interface PiniaCustomProperties {
    filterResponse: typeof getFilterResponse
  }
}

declare module 'vue-router' {
  // export interface RouteRecordRaw {
  //   icon?: 'string'
  // }
  export interface RouteMeta {
    title?: string
  }
}

declare global {
  interface RenderComponent {
    data?: any
    component?: any
  }
  type ComponentOriginOptions = {
    title: string
    headerDescText?: string
    headerIcon?: string
    confirmText?: string
    maxHeight?: number | string | 'auto'
    dialogWidth?: string | '500px'
    disabledConfirmButton?: boolean | false
    hideFooter?: boolean | false
    renderComponent: RenderComponent
    onConfirm?: (instance: any, context: any) => Promise<any>
    // onCancel?: (instance: Ref<null>, context: ComponentInternalInstance) => Promise<any>
  }

  type Mutable = {
    -readonly [K in keyof DialogProps]: DialogProps[K]
  }

  type PropsOptionsUnion = ComponentOriginOptions | Mutable
  type PropsOptionsMixed = Partial<ComponentOriginOptions & Mutable>

}
export { }
