declare namespace SwaggerUIBundle {
  interface SwaggerUIOptions {
    dom_id: string;
    spec: any;
    deepLinking: boolean;
    presets: any[];
    plugins: any[];
    layout?: string;
    filter?: boolean;
  }

  const presets: {
    apis: any;
  };

  const plugins: {
    DownloadUrl: any;
  };

  function SwaggerUIBundle(options: SwaggerUIOptions): any;
}

declare global {
  interface Window {
    SwaggerUIBundle: typeof SwaggerUIBundle;
    ui: any;
  }
}
