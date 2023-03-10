/**
 * @openapi
 * /api/v1/states:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Get Filtered States/ Logged in user only
 *       tags:
 *         - [States]
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   result:
 *                     type: string
 *                     example: {"count":5,"totalPages":1,"currentPages":1}
 *                   results:
 *                     type: array
 *                     $ref: '#/components/schema/statesBody'
 *         400:
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: not found / something wrong
 */