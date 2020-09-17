import {Request, Response} from "express";
import {SkillService} from "../services"

const express = require('express');
const router = express.Router();
const skillService = new SkillService();

interface query {
  page?: string;
  limit?: string;
  sortBy?: string;
  criteria?: string;
}

router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await skillService.getCategories();
    res.status(200).send(categories);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.get('/', async (req: Request<{}, any, any, query>, res: Response) => {
  // const { page, limit, sortBy, criteria }: query = req.query;
  try {
    const skills = await skillService.getSkills(req.query)
    const count = await skillService.countRecords();
    res.status(200).send({
      skills,
      totalRecords: count,
      currentPage: req.query.page,
    });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);
    res.status(200).send(skill);
  } catch {
    res.status(404).send(`error: can't get skill nr: ${req.params.id}`);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const skill = await skillService.postSkill(req.body);
    res.status(201).send(skill);
  } catch {
    res.status(418).send(`error: can't post skill`);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await skillService.editSkill(id, req.body);
    res.status(200).send(`skill nr: ${id} updated`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await skillService.deleteSkill(id)
    res.status(200).send(`skill nr: ${id} deleted`);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export {
  router
}
