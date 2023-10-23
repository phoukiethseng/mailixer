<?php

namespace App\Repositories\Traits;

trait EloquentCRUD {
    protected string $modelClassName = "";
    private function modelClass() {
        if ($this->modelClassName == "") {
            throw new \Exception("`modelClassName` property has not been set");
        }
        return $this->modelClassName;
    }
    private function isModelObject($object) {
        return $object instanceof $this->modelClassName;
    }
    private function makeSureGivenObjectIsModelObject($object) {
        if (!$object instanceof $this->modelClassName) {
            throw new \Exception("Given object is not instance of " . $this->modelClassName);
        }
    }
    public function findAll() {
        return $this->modelClass()::all(); 
    }
    public function findById($id)
    {
        return $this->modelClass()::find($id);
    }
    public function getNewInstance($attributes) {
        return $this->modelClass()::factory()->make($attributes);
    }
    public function save($model) {
        $this->makeSureGivenObjectIsModelObject($model);
        if ($model != null && $model->isDirty()) {
            $model->save();
        }
        return $model;
    }
    public function delete($model) {
        $this->makeSureGivenObjectIsModelObject($model);
       if ($model != null) {
        $model->forceDelete();
       } 
    }
}