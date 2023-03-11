/**
 * @openapi
 * components:
 *   schema:
 *     publicationsUser:
 *       type:
 *         object
 *       properties:
 *         id:
 *           type: string
 *           example: f5ea288e-cb3b-43e5-aa35-2f8bfc15a96b
 *         title:
 *           type: string
 *           example: Noticias
 *         description:
 *           type: string
 *           example: sobre noticias
 *         content:
 *           type: string
 *           example: Noticias sobre deportes
 *         reference_link:
 *           type: string
 *           example: facebook.com/f5ea288e-cb3b-43e5-aa35-2f8bfc15a96b
 *         cities_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *           example: 740273ca-b792-4129-a050-2fc01957d94d
 *         publications_types_id:
 *           type: integer
 *           example: 2
 *         created_at:
 *           type: date-time
 *           example: 2023-02-17 05:56:07.362+01
 *         updated_at:
 *           type: date-time
 *           example: 2023-02-17 05:56:07.362+01
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 740273ca-b792-4129-a050-2fc01957d94d
 *             first_name:
 *               type: string
 *               example: lauther
 *             last_name:
 *               type: string
 *               example: valladares
 *             country_id:
 *               type: integer
 *               example: 3
 *             image-url:
 *               type: integer
 *               example: https://paracuando.s3.sa-east-1.amazonaws.com/user-image-6e621741-7c53-4088-b344-add42819d7de-3c52eaf5-c7c3-4b55-8970-d4da5a2e2ec4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZPEQWT3PYDA672WW%2F20230311%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230311T161038Z&X-Amz-Expires=518400&X-Amz-Signature=129330d44a9821d1c5c5819b55206e73c55cf25469de1327d7f026cf43c67032&X-Amz-SignedHeaders=host&x-id=GetObject
 *     updatePublicationType:
 *       type:
 *         object
 *       properties:
 *         name:
 *           type: string
 *           example: Historias
 *         description:
 *           type: string
 *           example: Publicacion de historias en tu feed
 *     createPublication:
 *       type:
 *         object
 *       properties:
 *         title:
 *           type: string
 *           example: Noticias
 *         description:
 *           type: string
 *           example: sobre noticias
 *         content:
 *           type: string
 *           example: Noticias sobre deportes 
 *         reference_link:
 *           type: text
 *           example: www.facebook.com/123
 *         publications_types_id:
 *           type: integer
 *           example: 2
 *         tags:
 *           type: array
 *           example: [1,2,3]
 *     onePublicationUser:
 *       type:
 *         object
 *       properties:
 *         id:
 *           type: string
 *           example: f5ea288e-cb3b-43e5-aa35-2f8bfc15a96b
 *         title:
 *           type: string
 *           example: Noticias
 *         description:
 *           type: string
 *           example: sobre noticias
 *         content:
 *           type: string
 *           example: Noticias sobre deportes
 *         reference_link:
 *           type: string
 *           example: facebook.com/f5ea288e-cb3b-43e5-aa35-2f8bfc15a96b
 *         cities_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *           example: 740273ca-b792-4129-a050-2fc01957d94d
 *         publications_types_id:
 *           type: integer
 *           example: 2
 *         votes_count:
 *           type: integer
 *           example: 1
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 740273ca-b792-4129-a050-2fc01957d94d
 *             first_name:
 *               type: string
 *               example: lauther
 *             last_name:
 *               type: string
 *               example: valladares
 *             country_id:
 *               type: integer
 *               example: 3
 *             image-url:
 *               type: integer
 *               example: https://paracuando.s3.sa-east-1.amazonaws.com/user-image-6e621741-7c53-4088-b344-add42819d7de-3c52eaf5-c7c3-4b55-8970-d4da5a2e2ec4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZPEQWT3PYDA672WW%2F20230311%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230311T161038Z&X-Amz-Expires=518400&X-Amz-Signature=129330d44a9821d1c5c5819b55206e73c55cf25469de1327d7f026cf43c67032&X-Amz-SignedHeaders=host&x-id=GetObject
 *         city:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: Lima
 *             state_id:
 *               type: integer
 *               example: 1
 *         publications_type:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 2
 *             name:
 *               type: string
 *               example: Artistas y Conciertos
 *             description:
 *               type: string
 *               example: industria del entretenimiento en general
*/