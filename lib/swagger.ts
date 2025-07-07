export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Pets Catalog API",
    version: "1.0.0",
    description: "RESTful API для каталога домашних животных",
  },
  servers: [
    {
      url: "/api",
      description: "API Server",
    },
  ],
  paths: {
    "/pets": {
      get: {
        summary: "Получить список всех животных",
        description: "Возвращает список всех животных с возможностью фильтрации",
        parameters: [
          {
            name: "size",
            in: "query",
            description: "Фильтр по размеру",
            required: false,
            schema: {
              type: "string",
              enum: ["Small", "Medium", "Large"],
            },
          },
          {
            name: "fluffy",
            in: "query",
            description: "Фильтр по пушистости",
            required: false,
            schema: {
              type: "boolean",
            },
          },
          {
            name: "search",
            in: "query",
            description: "Поиск по имени",
            required: false,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Успешный ответ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PetsResponse",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Добавить новое животное",
        description: "Создает новое животное в каталоге",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreatePetRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Животное успешно создано",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Pet",
                },
              },
            },
          },
          "400": {
            description: "Неверные данные запроса",
          },
        },
      },
    },
    "/pets/{id}": {
      get: {
        summary: "Получить животное по ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Успешный ответ",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Pet",
                },
              },
            },
          },
          "404": {
            description: "Животное не найдено",
          },
        },
      },
      put: {
        summary: "Обновить животное",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdatePetRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Животное успешно обновлено",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Pet",
                },
              },
            },
          },
          "404": {
            description: "Животное не найдено",
          },
        },
      },
      delete: {
        summary: "Удалить животное",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "204": {
            description: "Животное успешно удалено",
          },
          "404": {
            description: "Животное не найдено",
          },
        },
      },
    },
    "/pets/stats": {
      get: {
        summary: "Получить статистику по животным",
        responses: {
          "200": {
            description: "Статистика по животным",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PetsStats",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Pet: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Уникальный идентификатор",
          },
          name: {
            type: "string",
            description: "Имя животного",
          },
          funFact: {
            type: "string",
            description: "Интересный факт о животном",
          },
          image: {
            type: "string",
            description: "Имя файла изображения",
          },
          size: {
            type: "string",
            enum: ["Small", "Medium", "Large"],
            description: "Размер животного",
          },
          isFluffy: {
            type: "boolean",
            description: "Является ли животное пушистым",
          },
        },
        required: ["id", "name", "funFact", "image", "size", "isFluffy"],
      },
      CreatePetRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Имя животного",
          },
          funFact: {
            type: "string",
            description: "Интересный факт о животном",
          },
          image: {
            type: "string",
            description: "Имя файла изображения",
          },
          size: {
            type: "string",
            enum: ["Small", "Medium", "Large"],
            description: "Размер животного",
          },
          isFluffy: {
            type: "boolean",
            description: "Является ли животное пушистым",
          },
        },
        required: ["name", "funFact", "image", "size", "isFluffy"],
      },
      UpdatePetRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Имя животного",
          },
          funFact: {
            type: "string",
            description: "Интересный факт о животном",
          },
          image: {
            type: "string",
            description: "Имя файла изображения",
          },
          size: {
            type: "string",
            enum: ["Small", "Medium", "Large"],
            description: "Размер животного",
          },
          isFluffy: {
            type: "boolean",
            description: "Является ли животное пушистым",
          },
        },
      },
      PetsResponse: {
        type: "object",
        properties: {
          pets: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Pet",
            },
          },
          total_count: {
            type: "integer",
            description: "Общее количество животных",
          },
          fluffy_count: {
            type: "integer",
            description: "Количество пушистых животных",
          },
          non_fluffy_count: {
            type: "integer",
            description: "Количество не пушистых животных",
          },
        },
      },
      PetsStats: {
        type: "object",
        properties: {
          total_count: {
            type: "integer",
            description: "Общее количество животных",
          },
          fluffy_count: {
            type: "integer",
            description: "Количество пушистых животных",
          },
          non_fluffy_count: {
            type: "integer",
            description: "Количество не пушистых животных",
          },
          size_distribution: {
            type: "object",
            properties: {
              Small: {
                type: "integer",
              },
              Medium: {
                type: "integer",
              },
              Large: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
}
