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
   *           type: string
   *           example: https://paracuando.s3.sa-east-1.amazonaws.com/user-image-6e621741-7c53-4088-b344-add42819d7de-3c52eaf5-c7c3-4b55-8970-d4da5a2e2ec4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZPEQWT3PYDA672WW%2F20230311%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230311T155035Z&X-Amz-Expires=518400&X-Amz-Signature=b063cc32b711dd479c8b29e6e404752639afb40c870fc99fac8d4eed4825e1aa&X-Amz-SignedHeaders=host&x-id=GetObject
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
   *   securitySchemes:
   *       bearerAuth:
   *         type: http
   *         scheme: bearer
   *         bearerFormat: JWT
   */