/**
 * @openapi
 * components:
 *   schema:
 *     publicationsUser:
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
 */