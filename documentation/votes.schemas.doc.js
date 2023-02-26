/**
 * @openapi
 * components:
 *   schema:
 *     votesUser:
 *       type:
 *         object
 *       properties:
 *         publication_id:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *           example: 740273ca-b792-4129-a050-2fc01957d94d
 *         user_id:
 *           oneOf:
 *             - type: string
 *             - type: integer
 *           example: 740273ca-b792-4129-a050-2fc01957d94d
 *         created_at:
 *           type: date-time
 *           example: 2023-02-17 05:56:07.362+01
 *         updated_at:
 *           type: date-time
 *           example: 2023-02-17 05:56:07.362+01
 */