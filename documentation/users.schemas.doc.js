 /**
   * @openapi
   * components:
   *   schema:
   *     login:
   *       type: 
   *         object
   *       properties:
   *           email:
   *             type: string
   *             example: laupadron1458@academlo.com
   *           password:
   *             type: string
   *             example: 1458
   *     loginResponse:
   *       type:
   *         object
   *       properties:
   *         email:
   *           type: string
   *           example: 'laupadron1458@gmail.com'
   *         token:
   *           type: string
   *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
   *     sign-up:
   *       type:
   *         object
   *       properties:
   *         first_name:
   *           type: string
   *           example: Laura
   *         last_name:
   *           type: string
   *           example: Padrón
   *         email:
   *           type: string
   *           example: laupadron1458@gmail.com
   *         password:
   *           type: string
   *           example: 1234
   *     forget-password:
   *       type:
   *         object
   *       properties:
   *        email:
   *          type: string
   *          example: laupadron1458@gmail.com
   *     responseMe:
   *       type:
   *         object
   *       properties:
   *         id:
   *           oneOf: 
   *             - type: string
   *             - type: integer
   *           example: 740273ca-b792-4129-a050-2fc01957d94d
   *         first_name:
   *           type: string
   *           example: Lauther
   *         last_name:
   *           type: string
   *           example: Valladares
   *         email:
   *           type: string
   *           example: lauthvalladares@gmail.com
   *         username:
   *           type: string
   *           example: lauthvalladares@gmail.com
   *         image_url:
   *           type: null
   *     updateUser:
   *       type:
   *         object
   *       properties:
   *         first_name:
   *           type: string
   *           example: Lauther
   *         last_name:
   *           type: string
   *           example: Valladares
   *         code_phone:
   *           type: integer
   *           example: +549345
   *         phone:
   *           type: integer
   *           example: 4181695
   *         country_id:
   *           type: integer
   *           example: 3
   *         image_url:
   *           type: null
   *   securitySchemes:
   *       bearerAuth:
   *         type: http
   *         scheme: bearer
   *         bearerFormat: JWT
   */