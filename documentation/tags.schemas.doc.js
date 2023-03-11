/**
 * @openapi
 * components:
 *   schema:
 *     tagsUser:
 *       type:
 *         object
 *       properties:
 *         tag_id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: string
 *           example: 6e621741-7c53-4088-b344-add42819d7de
 *         tags:
 *           type: 
 *             object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: Deportes
 *     tagsBody:
 *       type:
 *         object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: foodie
 *         description:
 *           type: string
 *           example: About foodie
 *     tagsAdd:
 *       type:
 *         object
 *       properties:
 *         name:
 *           type: string
 *           example: foodie
 *         description:
 *           type: string
 *           example: About foodie
 */