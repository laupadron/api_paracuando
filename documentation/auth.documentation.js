/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user into application
 *     tags:
 *       - [Auth]
 *     requestBody:
 *       description: Required fields to login a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/login'
 *     responses:
 *       200:
 *         description: OK
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/loginResponse'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not found user
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Sign-up at user into the App
 *     tags:
 *       - [Auth]
 *     requestBody:
 *       description: Required fields to sign-up at user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/sign-up'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success Sign Up
 * /api/v1/auth/forget-password:
 *   post:
 *     summary: Reset user password
 *     tags: 
 *       - [Auth]
 *     requestBody:
 *       description : Required field to reset a password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/forget-password'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email sended!, check your inbox
 * /api/v1/auth/change-password/{token}:
 *   post:
 *     summary: Change user password
 *     tags:
 *       - [Auth]
 *     parameters:
 *       - name: token
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: User Token
 *     requestBody:
 *       description: Required fields to change password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/forget-password'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Succes Update
 * /api/v1/auth/me:
 *   get:
 *     summary: get the profiles associated with the user's account
 *     tags:
 *       - [Auth]
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   $ref: '#/components/schema/responseMe'
 *                 profiles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schema/profilesMe'
*/